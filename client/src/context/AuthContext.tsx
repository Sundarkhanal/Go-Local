import { createContext, useContext, useEffect, useState } from "react"
import axiosInstance from "../lib/http/axios.config"
import { socket } from "../lib/socket/socket"

interface IAuthContextType {
  user: any
  setUser: React.Dispatch<React.SetStateAction<any>>
  fetchUser:() => Promise<void>
  loading: boolean
  login: (data: any) => void
  logout: () => void
}

const AuthContext = createContext<IAuthContextType | null>(null)

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get("auth/me")
      setUser(res.data.data)  
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = (data: any) => setUser(data)

  const logout = async () => {
    await axiosInstance.post("auth/logout")
    socket.disconnect()
    setUser(null)

  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser,fetchUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used inside AuthProvider")
  return context
}