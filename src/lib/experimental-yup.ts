import {object, string} from "yup";

const schema = object({
  name: string().required('Name is required'),
  age: string().required('Age is required').min(18, 'Age should be greater than 18'),
  email: string().required('Email is required')
})
