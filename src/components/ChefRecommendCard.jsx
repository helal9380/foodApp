/** @format */

const ChefRecommendCard = ({ item }) => {
  return (
    <div className=" bg-[#F3F3F3] shadow-sm">
      <figure className="p-2">
        <img
          src={item.image}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{item.name}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions">
          <button className="btn bg-[#FFA300] uppercase">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ChefRecommendCard;
