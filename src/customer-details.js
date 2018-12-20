import { pipe } from './helpers';

const VALID_COMPONENT_TYPES = {
  button: true,
  label_value: true,
  title: true,
  link: true,
  line: true
};

const cloneComponentDefinition = component => ({ ...component });

function validateComponentDefinition(component) {
  function createValidationError(error) {
    throw new Error(error);
  }

  if (!component || !component.type) {
    createValidationError(
      `You must supply a component definition with a 'type' property`
    );
  }

  const { type, data } = component;

  if (VALID_COMPONENT_TYPES[type] !== true) {
    createValidationError(`'${type}' is not a valid component type`);
  }

  switch (type) {
    case 'button':
      if (!data || !data.label) {
        createValidationError(
          `The button component must have a 'label' property`
        );
      }
      if (!data.id) {
        createValidationError(`The button component must have a 'id' property`);
      }
      break;

    case 'link':
      if (!data || !data.url) {
        createValidationError(`The link component must have a 'url' property`);
      }
      break;

    case 'title':
      if (!data || !data.title) {
        createValidationError(
          `The title component must have a 'title' property`
        );
      }
      if (typeof data.imgSize !== 'undefined') {
        if (data.imgSize !== 'small' || data.imgSize !== 'big') {
          createValidationError(
            `The title component must have a valid 'imgSize' property, allowed values are 'small' and 'big'`
          );
        }
      }
      break;
  }

  return component;
}

export function createComponentProcessor() {
  const processingPipe = pipe(
    cloneComponentDefinition,
    validateComponentDefinition
  );

  return function processComponents(components) {
    return components.map(processingPipe);
  };
}
