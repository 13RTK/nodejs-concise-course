function GroupImage({ img }: { img: string }) {
  return (
    <div className="avatar">
      <div className="w-64 rounded">
        <img src={img} />
      </div>
    </div>
  );
}

export default GroupImage;
