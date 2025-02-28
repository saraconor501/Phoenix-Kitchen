import useAuthStore from "../../store/auth-slice/auth-slice"
const AdminPage = () => {
  const {logoutUser} = useAuthStore()
  return (
    <>
      <h1 onClick={logoutUser}>logout</h1>
    </>
  )
}

export default AdminPage
