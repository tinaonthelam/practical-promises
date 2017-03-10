'use strict';

var Promise = require('bluebird'),
    async = require('async'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    blue = exerciseUtils.blue,
    magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE
};

// runs every problem given as command-line argument to process
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. log poem two stanza one and stanza two, in any order
   *    but log 'done' when both are done
   *    (ignore errors)
   *    note: reads are occurring in parallel (simultaneously)
   *
   */

  // callback version
  // async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- A. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- A. callback version done --');
  //   }
  // );

  // promise version
  var stanza1 = promisifiedReadFile('poem-two/stanza-01.txt')
    .then(function (stanza1) {
      console.log('-- A. Promisified version (stanza one) --');
      blue(stanza1);
    });

  var stanza2 = promisifiedReadFile('poem-two/stanza-02.txt')
    .then(function (stanza2) {
      console.log('-- A. Promisified version (stanza two) --');
      blue(stanza2);

    });

  Promise.all([stanza1, stanza2]).then(
    function () {
      console.log('-- A. callback version done --');
    }
  )

}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. log all the stanzas in poem two, in any order
   *    and log 'done' when they're all done
   *    (ignore errors)
   *    note: reads are occurring in parallel (simultaneously)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // callback version
  // async.each(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- B. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- B. callback version done --');
  //   }
  // );

  // promise version
  var stanzas = [];

  for (var i = 1; i < 9; i ++){
    stanzas.push(promisifiedReadFile('poem-two/stanza-0' + i + '.txt')
      .then(function (stanza) {
        console.log('-- B. Promisified version (stanza) --');
        blue(stanza);
      })
    );
  }

  Promise.all(stanzas).then(
    function () {
      console.log('-- B. callback version done --');
    }
  )

}

function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. read & log all the stanzas in poem two, *in order*
   *    and log 'done' when they're all done
   *    (ignore errors)
   *    note: reads are occurring in series (only when previous finishes)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- C. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- C. callback version done --');
  //   }
  // );

  // promise version
  var stanzas = [];
  for (var i = 1; i < 9; i ++){
    stanzas.push(promisifiedReadFile('poem-two/stanza-0' + i + '.txt'));
  }

  Promise.each(stanzas, function (stanza) {
    console.log('-- C. Promisified version (stanza) --');
    blue(stanza)
    }
  ).then(function () {
        console.log('-- C. callback version done --')
      }
    );


  // Promise.all(stanzas).then(
  //   function () {
  //     console.log('-- A. callback version done --');
  //   }
  // )

}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. log all the stanzas in poem two, *in order*
   *    making sure to fail for any error and log it out
   *    and log 'done' when they're all done
   *    note: reads are occurring in series (only when previous finishes)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  var randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';

  // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- D. callback version --');
  //       if (err) return eachDone(err);
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     if (err) magenta(err);
  //     console.log('-- D. callback version done --');
  //   }
  // );

  // promise version
  var stanzas = [];
  for (var i = 1; i < 9; i ++){
    stanzas.push(promisifiedReadFile('poem-two/stanza-0' + i + '.txt'));
  }

  Promise.each(stanzas, function (stanza) {
    console.log('-- D. Promisified version (stanza) --');
    blue(stanza)
    }
  ).then(function () {
        console.log('-- D. callback version done --')
  }).catch(function(err) {
    magenta(err);
  })

}

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. make a promisifed version of fs.writeFile
   *
   */

  var fs = require('fs');
  function promisifiedWriteFile (filename, str) {
    return new Promise(function (resolve, reject) {
      fs.writeFile(filename, str, function(err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  // promisifiedWriteFile('poem-one/stanza-01.txt', "hello").then(function(result) {
  //   console.log("I'm done writing the file.");
  // })
}
