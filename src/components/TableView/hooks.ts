import isEqual from 'lodash/isEqual';
import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import {
  EDataFilterConjunction,
  IDataFilter,
  IDataSorter,
  IProject,
} from '../../libs/client/types';
import {
  useUpdateProjectDataModelMutation,
  useUpdateProjectDataViewMutation,
} from '../../libs/react-query';
import { useNestedState } from '../hooks';
import {
  convertToColumnFilters,
  convertToColumnSorting,
  convertToColumnVisibility,
} from './helpers';
import { IGlobalFilter, IViewControlProps } from './types';

export function useViewControlProps(
  props: IViewControlProps,
  scrollBarRef: RefObject<Scrollbars>
) {
  const { project, model, view, fields, forms, records } = props;
  const { _id: projectId } = project;
  const { _id: modelId } = model;
  const { _id: viewId, filters = [], sorters = [] } = view;
  const modelFields = useMemo(
    () => fields.filter((field) => field.model === modelId),
    [fields, modelId]
  );
  const modelForms = useMemo(
    () => forms.filter((form) => form.model === modelId),
    [forms, modelId]
  );
  const modelRecords = useMemo(
    () => records.filter((record) => record.model === modelId),
    [records, modelId]
  );
  const visibleFieldIds = useMemo(
    () =>
      !view.visibleFields?.length
        ? modelFields.map((el) => el._id)
        : view.visibleFields,
    [view, modelFields]
  );

  const [columnFilters, setColumnFilters] = useNestedState(
    convertToColumnFilters(filters)
  );
  const mainFieldId = model.mainField || modelFields[0]?._id || undefined;
  const columnPinning = useMemo(
    () => ({ left: mainFieldId ? [mainFieldId] : undefined }),
    [mainFieldId]
  );
  const [columnVisibility, setColumnVisibility] = useNestedState(
    convertToColumnVisibility(
      modelFields.map((el) => el._id),
      visibleFieldIds
    )
  );
  const [columnOrder, setColumnOrder] = useNestedState(visibleFieldIds);
  const [globalFilter, setGlobalFilter] = useState<IGlobalFilter>({
    updatedAt: new Date().toISOString(),
    keywords: [],
  });
  const [sorting, setSorting] = useNestedState(convertToColumnSorting(sorters));

  const { mutateAsync: updateModelMutateAsync } =
    useUpdateProjectDataModelMutation();
  const { mutateAsync: updateViewMutateAsync } =
    useUpdateProjectDataViewMutation();

  const updateVisibleFields = useCallback(() => {
    if (columnOrder && !isEqual(columnOrder, visibleFieldIds)) {
      updateViewMutateAsync({ projectId, viewId, visibleFields: columnOrder });
    }
  }, [updateViewMutateAsync, visibleFieldIds, columnOrder, projectId, viewId]);
  const updateSorting = useCallback(() => {
    const newSorters = sorting.map((el) => ({
      field: el.id,
      descending: el.desc,
    }));
    if (!isEqual(sorters, newSorters)) {
      updateViewMutateAsync({ projectId, viewId, sorters: newSorters });
    }
  }, [updateViewMutateAsync, sorters, sorting, projectId, viewId]);
  const updateFilters = useCallback(() => {
    const newFilters = columnFilters.map((el) => ({
      field: el.id,
      operator: el.value.operator,
      operand: el.value.operand,
      conjunction: EDataFilterConjunction.And,
    }));
    if (!isEqual(filters, newFilters)) {
      updateViewMutateAsync({ projectId, viewId, filters: newFilters });
    }
  }, [updateViewMutateAsync, filters, columnFilters, projectId, viewId]);

  const handleSearchInputChange = useCallback((value: string) => {
    setGlobalFilter({
      updatedAt: new Date().toISOString(),
      keywords: value
        .split(' ')
        .map((el) => el.trim().toLowerCase())
        .filter((el) => !!el),
    });
  }, []);
  const handleVisibilityChange = useCallback(
    (fieldIds: string[]) => {
      setColumnOrder(fieldIds);
      setColumnVisibility(
        convertToColumnVisibility(
          modelFields.map((el) => el._id),
          fieldIds
        )
      );
    },
    [setColumnOrder, setColumnVisibility, modelFields]
  );
  const handleSortingChange = useCallback(
    (sorterList: IDataSorter[]) => {
      setSorting(
        sorterList.map((el) => ({ id: el.field, desc: el.descending }))
      );
    },
    [setSorting]
  );
  const handleFiltersChange = useCallback(
    (filterList: IDataFilter[]) => {
      setColumnFilters(
        filterList.map((el) => ({
          id: el.field,
          value: { operator: el.operator, operand: el.operand },
        }))
      );
    },
    [setColumnFilters]
  );

  const handleCreateDataFieldFinish = useCallback(
    (data: IProject) => {
      const field = data.fields[0];
      if (field && !model.mainField) {
        updateModelMutateAsync({
          projectId: data._id,
          modelId: model._id,
          mainField: field._id,
        });
      }
      if (view.visibleFields?.length) {
        const fieldIds = [...view.visibleFields, field._id];
        updateViewMutateAsync({
          projectId: data._id,
          viewId: view._id,
          visibleFields: fieldIds,
        });
      }
      // NOTE: update the state optimistically, do it after modelFields update
      requestAnimationFrame(() => {
        setColumnOrder((order) => [...order, field._id]);
        setColumnVisibility((visibility) => ({
          ...visibility,
          [field._id]: true,
        }));
        requestAnimationFrame(() => scrollBarRef.current?.scrollToRight());
      });
    },
    [
      setColumnOrder,
      setColumnVisibility,
      updateModelMutateAsync,
      updateViewMutateAsync,
      model,
      view,
      scrollBarRef,
    ]
  );

  const handleCreateDataRecordFinish = useCallback(() => {
    requestAnimationFrame(() => scrollBarRef.current?.scrollToBottom());
  }, [scrollBarRef]);

  useEffect(() => {
    setColumnOrder(visibleFieldIds);
    setColumnVisibility(
      convertToColumnVisibility(
        modelFields.map((el) => el._id),
        visibleFieldIds
      )
    );
  }, [setColumnOrder, setColumnVisibility, modelFields, visibleFieldIds]);

  useEffect(() => {
    setColumnFilters(convertToColumnFilters(filters));
  }, [setColumnFilters, filters]);

  useEffect(() => {
    setSorting(convertToColumnSorting(sorters));
  }, [setSorting, sorters]);

  return {
    mainFieldId,
    modelFields,
    modelForms,
    modelRecords,
    filters,
    sorters,
    visibleFieldIds,

    columnFilters,
    columnPinning,
    columnVisibility,
    columnOrder,
    globalFilter,
    sorting,

    updateFilters,
    updateSorting,
    updateVisibleFields,
    handleFiltersChange,
    handleSearchInputChange,
    handleSortingChange,
    handleVisibilityChange,

    handleCreateDataFieldFinish,
    handleCreateDataRecordFinish,
  };
}
