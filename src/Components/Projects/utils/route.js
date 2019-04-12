import {PROJECTS_PATH} from "../Projects";

export const redirectToJobsList = component => component.props.history.push(`${PROJECTS_PATH}`);
