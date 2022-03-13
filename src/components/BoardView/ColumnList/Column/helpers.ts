import {
  CreateProjectItemFieldsInput,
  ProjectItemType,
} from '../../../../graphql';

export function checkIfHttpUrl(str: string) {
  if (str.slice(0, 4) !== 'http') {
    return false;
  }
  try {
    new URL(str);
  } catch (_) {
    return false;
  }
  return true;
}

export function generateDefaultCreateProjectItemFieldsInput(
  content: string,
  projectId: string
) {
  const fields: CreateProjectItemFieldsInput = {
    type: ProjectItemType.Note,
    project: { link: projectId },
  };
  const isLink = checkIfHttpUrl(content);
  if (isLink) {
    fields.type = ProjectItemType.Link;
    fields.link = content;
  } else {
    const lines = content.split('\n');
    const lineCount = lines.length;
    if (lineCount > 1) {
      let mayBeTitle = lines[0];
      if (mayBeTitle.startsWith('#')) {
        mayBeTitle = mayBeTitle.slice(1).trim();
        if (mayBeTitle && !mayBeTitle.startsWith('#')) {
          fields.title = mayBeTitle;
          lines.shift();
        }
      }
      fields.content = lines.join('\n');
    } else {
      fields.title = content;
    }
  }
  return fields;
}
