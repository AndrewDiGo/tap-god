function Box(props) {
  return (
    <div className="col-3 box-item">
      <img
        src={props.box.logo}
        onClick={props.handleClickEvent}
        className="img img-rounded"
        alt=""
      />
    </div>
  );
}

export default Box;
