import Image from "next/image";

import { useOthers } from "@liveblocks/react/suspense";

const ActiveCollaborators = () => {
  const others = useOthers();

  const collaborators = others.map((other) => other.info);

  return (
    <ul className="collaborators-list">
      {collaborators.map(({ id, avatar, name, color }) => (
        <li key={id}>
          <Image
            alt={name}
            width={100}
            src={avatar}
            height={100}
            style={{ border: `3px solid ${color}` }}
            className="inline-block size-8 rounded-full ring-2 ring-dark-100"
          />
        </li>
      ))}
    </ul>
  );
};

export default ActiveCollaborators;
