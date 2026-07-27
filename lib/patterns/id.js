// Indonesian hyphenation patterns for hypher
// Generated from KBBI 2025 data
// Exceptions are loaded lazily from id-exceptions.js (~11KB)
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.Hypher.languages["id"] = factory();
  }
})(this, function () {
  var result = {
    "id": "id",
    "leftmin": 2,
    "rightmin": 2,
    "patterns": {
      "2": "a1e1i1o1u1",
      "3": "a1ba1ca1da1fa1ga1ka1pa1sa1te1be1ce1de1fe1ge1ke1pe1se1ti1bi1ci1di1fi1gi1ki1pi1si1to1bo1co1do1fo1go1ko1po1so1tu1bu1cu1du1fu1gu1ku1pu1su1t",
      "4": "2b1b2b1c2b1d2b1f2b1g2b1h2b1j2b1k2b1m2b1n2b1p2b1q2b1s2b1t2b1v2b1w2b1x2b1y2b1z2c1b2c1c2c1d2c1f2c1g2c1h2c1j2c1k2c1m2c1n2c1p2c1q2c1s2c1t2c1v2c1w2c1x2c1y2c1z2d1b2d1c2d1d2d1f2d1g2d1h2d1j2d1k2d1l2d1m2d1n2d1p2d1q2d1s2d1t2d1v2d1w2d1x2d1y2d1z2f1b2f1c2f1d2f1f2f1g2f1h2f1j2f1k2f1m2f1n2f1p2f1q2f1s2f1t2f1v2f1w2f1x2f1y2f1z2g1b2g1c2g1d2g1f2g1g2g1h2g1j2g1k2g1m2g1n2g1p2g1q2g1s2g1t2g1v2g1w2g1x2g1y2g1z2h1b2h1c2h1d2h1f2h1g2h1h2h1j2h1k2h1l2h1m2h1n2h1p2h1q2h1r2h1s2h1t2h1v2h1w2h1x2h1y2h1z2j1b2j1c2j1d2j1f2j1g2j1h2j1j2j1k2j1l2j1m2j1n2j1p2j1q2j1r2j1s2j1t2j1v2j1w2j1x2j1y2j1z2k1b2k1c2k1d2k1f2k1g2k1h2k1j2k1k2k1m2k1n2k1p2k1q2k1s2k1t2k1v2k1w2k1x2k1y2k1z2l1b2l1c2l1d2l1f2l1g2l1h2l1j2l1k2l1l2l1m2l1n2l1p2l1q2l1r2l1s2l1t2l1v2l1w2l1x2l1y2l1z2m1b2m1c2m1d2m1f2m1g2m1h2m1j2m1k2m1l2m1m2m1n2m1p2m1q2m1r2m1s2m1t2m1v2m1w2m1x2m1y2m1z2n1b2n1c2n1d2n1f2n1g2n1h2n1j2n1k2n1l2n1m2n1n2n1p2n1q2n1r2n1s2n1t2n1v2n1w2n1x2n1y2n1z2p1b2p1c2p1d2p1f2p1g2p1h2p1j2p1k2p1m2p1n2p1p2p1q2p1s2p1t2p1v2p1w2p1x2p1y2p1z2q1b2q1c2q1d2q1f2q1g2q1h2q1j2q1k2q1l2q1m2q1n2q1p2q1q2q1r2q1s2q1t2q1v2q1w2q1x2q1y2q1z2r1b2r1c2r1d2r1f2r1g2r1h2r1j2r1k2r1l2r1m2r1n2r1p2r1q2r1r2r1s2r1t2r1v2r1w2r1x2r1y2r1z2s1b2s1c2s1d2s1f2s1g2s1h2s1j2s1q2s1r2s1s2s1v2s1x2s1y2s1z2t1b2t1c2t1d2t1f2t1g2t1h2t1j2t1k2t1l2t1m2t1n2t1p2t1q2t1s2t1t2t1v2t1x2t1y2t1z2v1b2v1c2v1d2v1f2v1g2v1h2v1j2v1k2v1l2v1m2v1n2v1p2v1q2v1r2v1s2v1t2v1v2v1w2v1x2v1y2v1z2w1b2w1c2w1d2w1f2w1g2w1h2w1j2w1k2w1l2w1m2w1n2w1p2w1q2w1r2w1s2w1t2w1v2w1w2w1x2w1y2w1z2x1b2x1c2x1d2x1f2x1g2x1h2x1j2x1k2x1l2x1m2x1n2x1p2x1q2x1r2x1s2x1t2x1v2x1w2x1x2x1y2x1z2y1b2y1c2y1d2y1f2y1g2y1h2y1j2y1k2y1l2y1m2y1n2y1p2y1q2y1r2y1s2y1t2y1v2y1w2y1x2y1y2y1z2z1b2z1c2z1d2z1f2z1g2z1h2z1j2z1k2z1l2z1m2z1n2z1p2z1q2z1r2z1s2z1t2z1v2z1w2z1x2z1y2z1z"
    }
  };

  // Lazy-load exceptions from separate file on first access
  Object.defineProperty(result, 'exceptions', {
    configurable: true,
    get: function () {
      var val;
      try {
        val = require('./id-exceptions.js');
      } catch (e) {
        val = '';
      }
      // Replace getter with plain value for faster subsequent access
      Object.defineProperty(result, 'exceptions', { value: val, writable: true, configurable: true });
      return val;
    }
  });

  return result;
});
