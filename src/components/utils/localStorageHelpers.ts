type saveStateProps = {
    name:string;
    state:any
}
export const saveState = ({name, state}:saveStateProps) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(name, serializedState);
};

export const loadState = (name:string) => {
    const serializedState = localStorage.getItem(name);

    if(serializedState === null) {
        return undefined;
    }

    return JSON.parse(serializedState);
};