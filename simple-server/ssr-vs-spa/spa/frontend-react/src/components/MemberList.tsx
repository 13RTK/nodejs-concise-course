import { Group } from '../types/Group';
import MemberItem from './MemberItem';

function MemberList({ group }: { group: Group }) {
  return (
    <ul className="list bg-base-100 rounded-box shadow-md w-1/2 mx-auto">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        Member of {group.groupName}
        {group.isDefault && (
          <span>(default group, search by updating path params)</span>
        )}
      </li>

      <MemberItem group={group} />
    </ul>
  );
}

export default MemberList;
