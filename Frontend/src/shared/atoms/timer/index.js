import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.resendOTP = this.resendOTP.bind(this);
    const { minutes } = this.props;

    this.state = {
      start: Date.now(),
      diff: 0,
      minutes: this.getMinutesAndSeconds().minutes,
      seconds: this.getMinutesAndSeconds().seconds,
      duration: 60 * minutes,
      resend: false,
    };
    this.timerCount = '';
  }

  componentDidMount() {
    clearInterval(this.timerCount);
    this.timerCount = setInterval(() => {
      this.timer();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerCount);
  }

  getMinutesAndSeconds() {
    const { minutes } = this.props;
    const diff = 60 * minutes - (((Date.now() - Date.now()) / 1000) | 0); // eslint-disable-line no-bitwise
    const minutesVal = (diff / 60) | 0; // eslint-disable-line no-bitwise
    const seconds = diff % 60 | 0; // eslint-disable-line no-bitwise
    return {
      minutes: minutes < 10 ? `0${minutesVal}` : minutesVal,
      seconds: seconds < 10 ? `0${seconds}` : seconds,
    };
  }

  starttimer() {
    clearInterval(this.timerCount);
    this.timerCount = setInterval(() => {
      this.timer();
    }, 1000);
  }

  timer() {
    let { diff, minutes, seconds } = this.state;
    const { duration, start } = this.state;
    diff = duration - (((Date.now() - start) / 1000) | 0); // eslint-disable-line no-bitwise
    minutes = (diff / 60) | 0; // eslint-disable-line no-bitwise
    seconds = diff % 60 | 0; // eslint-disable-line no-bitwise
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    this.setState({ minutes, seconds });

    if (diff <= 0) {
      this.setState({ resend: true });
      const { onComplete } = this.props;
      if (onComplete) onComplete();
      clearInterval(this.timerCount);
    }
  }

  resendOTP(evt) {
    const { resendEvent, minutes } = this.props;
    this.setState({
      start: Date.now(),
      minutes: this.getMinutesAndSeconds().minutes,
      seconds: this.getMinutesAndSeconds().seconds,
      duration: 60 * minutes,
      resend: false,
    });
    resendEvent();
    this.starttimer();
    evt.preventDefault();
  }

  render() {
    const { resend, minutes, seconds } = this.state;
    return (
      <div>
        {!resend && (
          <h3 className="errMsg">
            {+minutes > 0 && `${minutes} m`} {`${seconds} s`}
          </h3>
        )}
        {resend && (
          <button type="button" className="resend" onClick={this.resendOTP}>
            Resend
          </button>
        )}
      </div>
    );
  }
}

export default Timer;
