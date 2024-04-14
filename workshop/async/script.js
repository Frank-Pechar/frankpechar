hljs.highlightAll();

('use strict');

//********* A S Y N C - E X E C U T I O N - P R I O R I T Y *********
// C A S E 1

const clickHandler1 = function () {
  console.log('2 CStack (main thread)');

  setTimeout(() => console.log('6 CallbackQ to CStack'), 0);

  Promise.resolve('4 MicrotaskQ to CStack').then((res) => {
    console.log(res);
  });

  setTimeout(() =>
    Promise.resolve('7 CallbackQ to MicrotaskQ to CStack').then((res) => {
      console.log(res);
    })
  );

  Promise.resolve('5 MicrotaskQ w/loop to CStack').then((res) => {
    for (let i = 0; i < 500000000; i++) {}
    console.log(res);
  });

  setTimeout(() => console.log('8 CallbackQ to CStack'), 0);

  console.log('3 CStack (main thread)');
};

document.querySelector('.btn-case1').addEventListener('click', () => {
  console.log(
    '%c*** Asynchronous Execution Priorities ***',
    'color: blue; font-weight: bold;'
  );
  console.log('1 CallbackQ to CStack');
  clickHandler1();
});

// C A S E 2
//********* A S Y N C - E X E C U T I O N  -  A W A I T *********

const getPosition1 = function (opts) {
  console.log('08 - getPosition1 await - Start');
  const promise = new Promise((resolve, reject) => {
    console.log('09 - getPosition1 await - Promisify getCurrentPosition');
    navigator.geolocation.getCurrentPosition(
      (success) => {
        console.log(
          '11 - getPosition1 await - Promisified (Microtask) getCurrentPosition web api success callback completed'
        );
        resolve(success);
      },
      (error) => {
        reject('Could not get location 💥', error);
      },
      opts
    );
  });
  console.log(
    '10 - getPosition1 await - Returning getCurrentPosition Pending Promise'
  );
  return promise;
};

const setTimer1 = (duration) => {
  console.log(
    duration === 1000
      ? '03 - setTimer1(1000) await - Start'
      : '12 - setTimer1(2000) await - Start'
  );

  const promise = new Promise((resolve, reject) => {
    console.log(
      `${
        duration === 1000
          ? '04 - setTimer1(1000) await - Promisify setTimeout(1000)'
          : '13 - setTimer1(2000) await - Promisify setTimeout(2000)'
      }`
    );
    setTimeout(() => {
      resolve(
        duration === 1000
          ? '07 - setTimer1(1000) await - Promisified (Microtask) setTimeout(1000) web api callback completed'
          : '15 - setTimer1(2000) await - Promisified (Microtask) setTimeout(2000) web api callback completed'
      );
    }, duration);
  });

  console.log(
    `${
      duration === 1000
        ? '05 - setTimer1(1000) await - Returning setTimeout(1000) Pending Promise'
        : '14 - setTimer1(2000) await - Returning setTimeout(2000) Pending Promise'
    }`
  );
  return promise;
};

async function trackUserHandler1() {
  let res, timerData, posData;

  console.log(
    '%c*** Asynchronous Processing Using Async Await ***',
    'color: blue; font-weight: bold;'
  );
  console.log('01 - main thread - Start trackUserHandler1');

  setTimeout(
    () => console.log('06 - CallbackQ to Call Stack - setTimeout(0000)'),
    0
  );

  res = await Promise.resolve(
    '02 - MicrotaskQ to Call Stack - Promise.resolve'
  );
  console.log(res);

  timerData = await setTimer1(1000);
  console.log(timerData);

  try {
    posData = await getPosition1();
    timerData = await setTimer1(2000);
    console.log(timerData);
    console.log(posData);
  } catch (err) {
    console.error('Catch Geolocation error: ' + err);
  }

  console.log('16 - main thread - End trackUserHandler1');
}

document
  .querySelector('.btn-case2')
  .addEventListener('click', trackUserHandler1);

// C A S E 3
//********* A S Y N C - E X E C U T I O N - .then *********

const getPosition2 = (opts) => {
  console.log('02 - main thread - getPosition2 - Start');

  const promise = new Promise((resolve, reject) => {
    console.log(
      '03 - main thread - getPosition2 - Promisify getCurrentPosition'
    );

    navigator.geolocation.getCurrentPosition(
      (success) => {
        console.log(
          '11 - getPosition2 - Promisified (Microtask) getCurrentPosition web api success callback'
        );
        resolve(success);
      },
      (error) => {
        reject(error);
      },
      opts
    );
  });

  console.log(
    '04 - main thread - getPosition2 - Returning getCurrentPosition Pending Promise'
  );

  return promise;
};

const setTimer2 = (duration) => {
  console.log(
    `${
      duration === 1000
        ? '05 - main thread - setTimer2(1000) - Start'
        : '13 - setTimer2(2000) - Start - Called from trackUserHandler2 .getPosition2().then'
    }`
  );

  const promise = new Promise((resolve, reject) => {
    console.log(
      `${
        duration === 1000
          ? '06 - main thread - setTimer2(1000) - Promisify setTimeout(1000)'
          : '14 - setTimer2(2000) - Called from trackUserHandler2.getPosition2().then - Promisify setTimeout(2000)'
      }`
    );

    setTimeout(() => {
      resolve(
        '17 - setTimer2(2000) - Promisified (Microtask) setTimeout(2000) web api callback executed'
      );
    }, duration);
  });

  console.log(
    `${
      duration === 1000
        ? '07 - main thread - setTimer2(1000) - Returning setTimeout(1000) Pending Promise'
        : `15 - setTimer2(2000) - Called from trackUserHandler2.getPosition2()
            .then - Returning setTimeout(2000) Pending Promise`
    }`
  );

  return promise;
};

function trackUserHandler2() {
  console.log(
    '%c*** Asynchronous Processing Using .then Method ***',
    'color: blue; font-weight: bold;'
  );
  console.log('01 - main thread - Start trackUserHandler2');
  let positionData;

  setTimeout(
    () => console.log('10 - CallbackQ to Call Stack - setTimeout=0'),
    0
  );

  Promise.resolve('09 - MicrotaskQ to Call Stack - Promise.resolve').then(
    (res) => {
      console.log(res);
    }
  );

  getPosition2()
    .then((posData) => {
      console.log(
        '12 - trackUserHandler2 - getPosition2().then method - completed resolved promise for getCurrentPosition'
      );

      positionData = posData;
      return setTimer2(2000);
    })

    .catch((err) => {
      console.error('Could not get location 💥', err);
    })

    .then((data) => {
      console.log(data);
      console.log(
        '18 - End trackUserHandler2 - getCurrentPosition & setTimeout .then methods'
      );
      console.log(positionData);
    });

  setTimer2(1000).then(() => {
    console.log('16 - trackUserHandler2 - setTimer2(1000).then method started');
  });

  console.log('08 - main thread - End trackUserHandler2');
}

document
  .querySelector('.btn-case3')
  .addEventListener('click', trackUserHandler2);
