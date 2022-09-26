import { FC } from 'react'
import * as styles from './navbar.module.scss'
import { NavLink } from 'react-router-dom'

export const AppNavbar: FC = () => {
    return (
        <nav className="">
            <ul className={styles.links}>
                <li>
                    <NavLink to="/diseases">Diseases</NavLink>
                </li>
                <li>
                    <NavLink to="/symptoms">Symptoms</NavLink>
                </li>
                <li>
                    <NavLink to="/risks">Risks</NavLink>
                </li>
            </ul>
        </nav>
    )
}
