export function loadVisaTypeOptions(formSchema) {
  let step;
  let section;
  let field;
  let fieldAttributes;
  let fieldAttribute;
  for (let fs = 0; fs < formSchema.length; fs += 1) {
    step = formSchema[fs];
    for (let s = 0; s < step.sections.length; s += 1) {
      section = step.sections[s];
      for (let fa = 0; fa < section.fieldArray.length; fa += 1) {
        field = section.fieldArray[fa];
        fieldAttributes = Object.keys(field);
        for (let a = 0; a < fieldAttributes.length; a += 1) {
          fieldAttribute = fieldAttributes[a];
          if (fieldAttribute === 'name' && field[fieldAttribute] === 'passengerAndVisaType') {
            return field.visaOptions;
          }
        }
      }
    }
  }
  return [];
}

export function utilityFunction1(params) {
  return params + 1;
}
