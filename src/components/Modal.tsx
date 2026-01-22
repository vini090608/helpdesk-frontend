import { useNavigate } from "react-router"
import profile from "../assets/icons/hover/hover-circle-user.svg"
import logOut from "../assets/icons/log-out.svg"
import { useAuth } from "../hooks/useAuth"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null
  const navigate = useNavigate()
  const user = useAuth()

  return (
    <div className="bg-gray-200 absolute bottom-4 left-1/7 w-50 rounded-2xl p-3" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col">

          <span className="text-gray-400 text-xxs p-3">OPÇÕES</span>

            <button className=" text-white border-none bg-transparent p-2 flex gap-2">
              <img src={profile} alt="" />
              <span className="text-gray-500 text-heading-md" > Perfil </span> 
            </button>

            <button onClick={() => ((navigate("/")), user.remove)} className=" text-white border-none bg-transparent p-2 flex gap-2">
              <img src={logOut} alt="" />
              <span className="text-feedback-danger text-heading-md" > Sair </span>
            </button>
        </div>
      </div>
    </div>
  )
}

export default Modal