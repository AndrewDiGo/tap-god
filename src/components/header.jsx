function Header(props) {
  return (
    <div id="header" className="row text-center">
      <div className="col-6 text-center">
        <div className="row">
          <div className="col-12">
            <h2>Tap God</h2>
          </div>

          <div className="col-12">
            <h2>Level {props.data.level}</h2>
          </div>
        </div>
      </div>
      <div className="col-3 text-center">
        <h2>
          Score <br />
          {props.data.score}
        </h2>
      </div>
      <div className="col-3 text-center">
        <h2>
          Time <br />
          {props.data.timer}
        </h2>
      </div>
    </div>
  );
}

export default Header;
