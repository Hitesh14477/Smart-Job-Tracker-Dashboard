import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { useApplicationContext } from '../context/ApplicationContext'
import { JOB_STATUSES } from '../utils/helpers'

const schema = yup.object({
  companyName: yup.string().required('Company name is required'),
  jobRole: yup.string().required('Job role is required'),
  location: yup.string(),
  salaryRange: yup.string(),
  applicationPlatform: yup.string(),
  status: yup.string().oneOf(JOB_STATUSES).required(),
  appliedDate: yup.string().required('Applied date is required'),
  interviewDate: yup.string().nullable(),
  notes: yup.string(),
})

const initialValues = {
  companyName: '',
  jobRole: '',
  location: '',
  salaryRange: '',
  applicationPlatform: '',
  status: 'Applied',
  appliedDate: new Date().toISOString().slice(0, 10),
  interviewDate: '',
  notes: '',
}

function AddApplication() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { applications, addApplication, updateApplication } = useApplicationContext()
  const isEdit = Boolean(id)
  const selected = applications.find((item) => item.id === id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (isEdit && selected) {
      reset(selected)
    } else {
      reset(initialValues)
    }
  }, [isEdit, reset, selected])

  const onSubmit = (values) => {
    if (isEdit && selected) {
      updateApplication(selected.id, values)
    } else {
      addApplication(values)
    }
    navigate('/applications')
  }

  return (
    <section className="container">
      <h2>{isEdit ? 'Edit Application' : 'Add Job Application'}</h2>

      <form className="card form-grid" onSubmit={handleSubmit(onSubmit)}>
        <label>
          Company Name *
          <input className="input" {...register('companyName')} />
          <small className="error">{errors.companyName?.message}</small>
        </label>

        <label>
          Job Role *
          <input className="input" {...register('jobRole')} />
          <small className="error">{errors.jobRole?.message}</small>
        </label>

        <label>
          Location
          <input className="input" {...register('location')} />
        </label>

        <label>
          Salary Range
          <input className="input" placeholder="900000-1400000" {...register('salaryRange')} />
        </label>

        <label>
          Application Platform
          <input className="input" {...register('applicationPlatform')} />
        </label>

        <label>
          Status
          <select className="input" {...register('status')}>
            {JOB_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          Applied Date *
          <input className="input" type="date" {...register('appliedDate')} />
          <small className="error">{errors.appliedDate?.message}</small>
        </label>

        <label>
          Interview Date
          <input className="input" type="date" {...register('interviewDate')} />
        </label>

        <label className="full-width">
          Notes
          <textarea className="input" rows="4" {...register('notes')} />
        </label>

        <button className="button submit-btn" type="submit">
          {isEdit ? 'Update Application' : 'Save Application'}
        </button>
      </form>
    </section>
  )
}

export default AddApplication
