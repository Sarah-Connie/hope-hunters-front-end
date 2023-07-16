export function RenderFormButton({ onClick, buttonText }) {
    return (
      <button
        className="bg-lightblue hover:bg-orange hover:scale-105 ease-out duration-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-96 h-16"
        onClick={onClick}
      >
        {buttonText}
      </button>
    );
}

export default RenderFormButton