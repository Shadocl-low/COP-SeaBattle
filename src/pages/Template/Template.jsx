import styles from './Template.module.css';
import {Outlet} from "react-router";

export function Template() {
    return (
        <div className={styles.layout}>
            <Outlet />
        </div>
    );
}