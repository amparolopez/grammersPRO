const Edit = () => {
    return (
        <>
            <div></div>
            <div>
                <input type="text" defaultValue="NameUser"/>
                <input type="text" defaultValue="LastName"/>
                <select name="country">
                    <option value="pais">Valor defecto pais</option>
                </select>
                <select name="job">
                    <option value="job">job</option>
                </select>
            </div>
        </>
    )
}

export default Edit
