class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times : {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
        }
    }
}
    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0,
            }
           
        });
        this.state.running = false;
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
            Math.floor(times.miliseconds)
        )}`;
    }
    start() {
        if (!this.state.running) {
            this.setState({
                running: true,
                watch: setInterval(() => this.step(), 10)
            });
        }
    }
    step() {
        if (!this.state.running) return;
        this.calculate();
    }
    calculate() {
        this.state.times.miliseconds += 1;
        if (this.state.times.miliseconds >= 100) {
            this.state.times.seconds += 1;
            this.state.times.miliseconds = 0;
        }
        if (this.state.times.seconds >= 60) {
            this.state.times.minutes += 1;
            this.state.times.seconds = 0;
        }
        this.setState({
            times: this.state.times
        });
    }
    stop() {
        clearInterval(this.state.watch);
        this.setState({
            running: false
        });
    }
    saveResult(times) {
        let liItem = document.createElement('li');
        let results = document.querySelector('.results');
        liItem.innerHTML = this.format(this.state.times);
        results.appendChild(liItem);
    }
    clearResult() {
        document.querySelector('.results').innerHTML = '';

    }
    render() {
        return (
        <div className= {'app'}>
          <nav className= {'controls'}>
                <div className= {'btn'}>
                    <a href={"#"} className={'button'} id={'start'} onClick={() => this.start()}>Start</a>
                    <a href={"#"} className={'button'} id={'stop'} onClick={() => this.stop()}>Stop</a>
                    <a href={"#"} className={'button'} id={'reset'} onClick={() => this.reset()}>Reset</a>
                    <a href={"#"} className={'button'} id={'saveResult'} onClick={() => this.saveResult()}>Save Result</a>
                    <a href={"#"} className={'button'} id={'clear'} onClick={() => this.clearResult()}>Clear</a>
                </div>
                <div className={'stopwatch'}>
                {this.format(this.state.times)}
                </div>
                <ol className='results'></ol>
           </nav>
        </div>
        );
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var element = React.createElement(Stopwatch);
ReactDOM.render(element,document.getElementById('app'));




