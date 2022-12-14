const MainCard = ({src, onHeartClick, aleadyFavorite}) => {

    const heartIcon = aleadyFavorite ? "đ" : "đ¤";

    return(
        <div className="main-card">
        <img 
            src={src}
            alt="ęł ěě´"
            width="400"          
        />
        <button 
            onClick={onHeartClick}             
            >{heartIcon}</button>
        </div>
    );
};

export default MainCard;