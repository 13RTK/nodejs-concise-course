import { Group } from '../types/Group';

function MemberItem({ group }: { group: Group }) {
  return group.members.map((member) => (
    <li className="list-row" key={member.name}>
      <div>
        <img className="h-30" src={member.avatar} />
      </div>
      <div>
        <div>{member.name}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          {member.position}
        </div>
      </div>
    </li>
  ));
}

export default MemberItem;
