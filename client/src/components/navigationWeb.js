import { Link } from "react-router-dom";

export function navigationWeb() {
  return (
    <nav>
        <ul>
            <li>
                <Link to='userlist'>Usuarios</Link>
            </li>
        </ul>
    </nav>
  )
}
