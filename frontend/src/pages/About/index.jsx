import classNames from 'classnames';
import { useStyles } from './styles';

import { useGlobalStyles } from '../../styles';
import { Link } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const Home = () => {
  const classes = useStyles();
  const globalStyles = useGlobalStyles();
  const {
    currentAccount,
    connectWallet,
    isStudent,
    addTeacher,
    changeChairman,
    removeTeacher,
    pauseContract,
    unPauseContract,
  } = useContext(AppContext);
  const [address, setAddress] = useState('');
  const [chairman, setChairman] = useState('');
  const submitHandler = (event) => {
    event.preventDefault();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addTeacher(address);
  };
  const handleRemove = async (e) => {
    e.preventDefault();
    await removeTeacher(address);
  };
  const handleChair = async (e) => {
    e.preventDefault();
    await changeChairman(address);
  };

  return (
    <main>
      <section
        className={classNames(
          globalStyles.px,
          classes.hero,
          'bg-no-repeat flex flex-col pb-2',
        )}>
        (
        <div className="col-md-9">
          <div className="row mb-3">
            <h3>Add Teacher</h3>
          </div>
          <div className="row">
            <form class="row g-3">
              <div class="col-12">
                <label for="inputAddress" class="form-label">
                  Address
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  placeholder="Enter Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div class="col-12">
                <button
                  type="submit"
                  class="btn btn-primary mr-7"
                  onClick={handleAdd}>
                  Add Teacher
                </button>
                {'     '} {'     '}{' '}
                <button
                  type="submit"
                  class=" pl-9 btn btn-warning"
                  onClick={handleRemove}>
                  Remove Teacher
                </button>
              </div>
            </form>
          </div>
          <br />
          <br />
          <div>
            <label for="inputAddress" class="form-label">
              CHAIRMAN
            </label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="Enter Address"
              onChange={(e) => setChairman(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              class="btn btn-primary mr-7"
              onClick={handleChair}>
              changeChairman
            </button>
          </div>
          <br />
          <br />
          <br />
          <br />
          <button className="btn btn-lg btn-success" onClick={unPauseContract}>
            Restart Contract
          </button>{' '}
          <br />
          <br />
          <button className="btn btn-lg btn-danger" onClick={pauseContract}>
            Pause Contract
          </button>
        </div>
        )
      </section>
    </main>
  );
};

export default Home;
