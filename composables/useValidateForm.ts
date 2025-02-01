type FormField = {
    value: string 
    error: string;
  type: string;
    required:boolean
  };
  
  type Form = Record<string, FormField>;
  
  export const requiredText = "Это поле обязательно";
  export const invalidNumberText = "Значение должно быть числом";
  export const wrongCredentials='Неправильный пароль'
  export const userNotFound='Пользователь не найден'
  export function useValidateForm(field: FormField) {
    console.log("field", field);
  
    if (field.type === "text"  || field.type==='array' || field.type==='date') {
      if (!field.value?.length && field.required) {
        field.error = requiredText;
      } else {
        field.error = "";
      }
    } else if (field.type === "password") {
      if (!field.value?.length) {
        field.error = requiredText;

      } else {
        field.error = "";
      }
    } else if (field.type === "number") {
      // if (!field.value.length) {
      //   field.error = requiredText; // Required check
      // } 
       if (isNaN(Number(field.value)) || Number(field.value)<=0) {
        field.error = invalidNumberText; // Ensure it's a valid number
      } 
      
      else {
        field.error = "";
      }
    } else {
      // field.error = 'Unsupported field type'; // Optionally handle unsupported types
    }
  }
  
  export const validateForm = (form: Form) => {
    for (const key in form) {
      useValidateForm(form[key]);
    }
  
    console.log("validation form", form);
    return Object.values(form).every((field) => field.error === "");
  };
  