function Dots(props: { number: number }) {
  function createArray(length: number): any[] {
    return Array.from({ length });
  }
  return (
    <div className="flex gap-2 py- justify-center">
      {createArray(props.number).map((dot) => (
        <span className="w-2 h-2 bg-[#79c000]"></span>
      ))}
    </div>
  );
}
export default Dots;
