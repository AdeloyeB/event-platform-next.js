const UserDetails = async (params: { params: Promise<{ id: string }> }) => {
    const {id} = await params.params;       
    return <div>
        <h1>User Details {id}</h1>
    </div>  
}

export default UserDetails