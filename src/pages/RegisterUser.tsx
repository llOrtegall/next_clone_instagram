import axios from 'axios'
import { useState } from 'react'

export function RegistrarUser () {
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [documento, setDocumento] = useState(0)
  const [telefono, setTelefono] = useState(0)
  const [correo, setCorreo] = useState('')
  const [empresa, setEmpresa] = useState()
  const [proceso, setProceso] = useState()
  const [rol, setRol] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    axios.post('http://localhost:6060/register', {
      nombres,
      apellidos,
      documento,
      telefono,
      correo,
      empresa,
      proceso,
      rol
    }).then(() => {
      console.log('User created')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <section className="w-full h-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className='w-3/4 grid grid-cols-2 relative bg-slate-600 p-20 rounded-lg'>
        <input className='p-2 rounded-md m-2'
          type="text"
          placeholder="Nombres"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
          required
        />
        <input className='p-2 rounded-md m-2'
          type="text"
          placeholder="Apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          required
        />
        <input className='p-2 rounded-md m-2'
          type='number'
          placeholder='N° Documento'
          value={documento}
          onChange={(e) => setDocumento(Number(e.target.value))}
          required
        />
        <input className='p-2 rounded-md m-2 '
          type="number"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(Number(e.target.value))}
          required
        />
        <select className='p-2 rounded-md m-2' value={proceso} onChange={(e) => setProceso(e.target.value)}>
          <option> Seleccione un proceso </option>
          <option typeof='number' value={1}>Técnología</option>
          <option typeof='number' value={2}>Contabilidad</option>
          <option typeof='number' value={3}>Comercial</option>
          <option typeof='number' value={4}>Administración</option>
          <option typeof='number' value={5}>Gestión Humana</option>
          <option typeof='number' value={6}>Gerencia</option>
          <option typeof='number' value={7}>Tesoreria</option>
          <option typeof='number' value={8}>Auditoria</option>
          <option typeof='number' value={9}>Cumplimiento</option>
        </select>
        <input className='p-2 rounded-md m-2'
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <select className='p-2 rounded-md m-2' value={empresa} onChange={(e) => setEmpresa(e.target.value)}>
          <option> Seleccione una empresa </option>
          <option value={0}>Multired / Servired</option>
          <option value={1}>- Multired -</option>
          <option value={2}>- Servired -</option>
        </select>
        <input className='p-2 rounded-md m-2'
          type="text"
          placeholder="Rol"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
          required
        />
        <button type="submit" className='p-2 bg-blue-500 rounded-md border absolute bottom-0 right-96 left-96 mb-6'>Enviar</button>
      </form>
    </section>
  )
}
