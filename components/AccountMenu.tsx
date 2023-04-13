import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import React from "react";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: currentUser } = useCurrentUser()

  return (
    <>
      {visible && (
        <div className="bg-black w-56 absolute lg:top-14 top-10 right-0 py-4 flex flex-col border-2 border-gray-800">
            <div className="flex flex-col gap-3">
                <div className="px-4 group/item flex flex-row gap-3 items-center w-full">
                    <img src="/images/default-blue.png" className="w-8 rounded-md" />
                    <p className="text-white text-sm group-hover/item:underline">
                        {currentUser?.name}
                    </p>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-2" />
                <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
                    Sign out of Netflix
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default AccountMenu;
