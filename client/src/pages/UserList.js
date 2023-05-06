import { useMyContex } from "../context/restaurantContext"
import { Link } from "react-router-dom"

export function UserList() {
  const { users } = useMyContex()

  if(users.length === 0) return(
    <div>
      <h1>No hay ususarios</h1>
      <Link to="/UserForm">Nuevo usuario</Link>
    </div>
  )
  return (
    <div className="w-full h-screen bg-primary flex flex-col items-center pb-16">
      <div className="w-full h-auto items-center bg-secondary flex px-2 space-x-2 py-6 pt-14 mb-6 overflow-x-auto overscroll-x-contain lg:mt-4">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
        </table>
      </div>
      <Link className="btn-primary-new" to="/UserForm">Nuevo usuario</Link>
    </div>
  )
}
