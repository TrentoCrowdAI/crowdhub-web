import {PROJECTS_PATH} from "../Projects";

export const redirectToProjectsList = component => component.props.history.push(`${PROJECTS_PATH}`);
