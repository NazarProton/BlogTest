import { all, spawn } from "redux-saga/effects"
import usersSaga from "./users";

export default function* rootSaga() {

    const sagas = [ usersSaga ];

    yield all(sagas.map(s=>spawn(s)))
}