import { useNavigate } from "react-router";
import profile from "../assets/icons/hover/hover-circle-user.svg";
import logOut from "../assets/icons/log-out.svg";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { Profile } from "./Profile";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ isOpen, onClose }: ModalProps) {
  const navigate = useNavigate();
  const user = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-30"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="absolute bottom-4 left-1/7 w-50 
                   bg-gray-100 rounded-2xl p-3 z-40"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-gray-400 text-xxs p-3">OPÇÕES</span>

        <button
          onClick={() => setProfileOpen(true)}
          className="p-2 flex gap-2 bg-transparent"
        >
          <img src={profile} alt="" />
          <span className="text-gray-500 text-heading-md">Perfil</span>
        </button>

        <button
          onClick={() => {
            user.remove();
            navigate("/");
          }}
          className="p-2 flex gap-2 bg-transparent"
        >
          <img src={logOut} alt="" />
          <span className="text-feedback-danger text-heading-md">
            Sair
          </span>
        </button>

        <Profile
          isOpen={profileOpen}
          onClose={() => setProfileOpen(false)}
        />
      </div>
    </>
  );
}