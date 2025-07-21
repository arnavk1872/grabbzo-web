import UserBtn from "./UserBtn";
interface SidebarProps {
  setSelectedUser: (user: UserType) => void;
}

interface UserType {
  name: string;
  lastMessage: string;
  time: string;
  newMessageCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ setSelectedUser }) => {
  const OrderHistory = [
    {
      name: "Shreesh",
      lastMessage: "Hi, how much time it ...",
      time: "5 min",
      newMessageCount: 1,
    },
    {
      name: "Purnika",
      lastMessage: "Hi, how much time it ...",
      time: "15 min",
      newMessageCount: 1,
    },
  
  ];

  return (
    <div className="min-w-[350px] bg-white border border-borderColor rounded-3xl pr-2 min-h-[50vh] font-poppins mr-4 h-screen overflow-y-auto no-scrollbar">
      <h3 className="text-center font-medium text-xl border-b-2 py-4 ">
        Messages
      </h3>

      <div className="my-5">
        {OrderHistory.map((item, key) => (
          <div
            key={key}
            onClick={() => setSelectedUser(item)}
            className="cursor-pointer"
          >
            <UserBtn
              name={item.name}
              lastMessage={item.lastMessage}
              time={item.time}
              newMessageCount={item.newMessageCount}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
