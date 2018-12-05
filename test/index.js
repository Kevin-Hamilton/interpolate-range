import test from 'tape';
import { interpolate, smoothStep } from '../src';

test('interpolate provides correct result', function(t) {
  const int = interpolate({
    inputRange: [100, 200],
    outputRange: [0, 100],
  });
  const intClamped = interpolate({
    inputRange: [-100, 100],
    outputRange: [0, 1],
    clamp: true,
  });
  const intSmooth = interpolate({
    inputRange: [50, 500],
    outputRange: [0, 1],
    fn: smoothStep,
  });
  const intNonZeroOutputMin = interpolate({
    inputRange: [0, 100],
    outputRange: [20,40]
  });
  const intClampMaxBeforeMin = interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    clamp: true
  });

  // basic
  t.equal( int(1), -99 )
  t.equal( int(150), 50 )
  t.equal( int(250), 150 )
  t.equal( int(12), -88 )
  t.equal( int(-120), -220 )

  // clamped
  t.equal( intClamped(100), 1 )
  t.equal( intClamped(500), 1 )
  t.equal( intClamped(-50), 0.25 )
  t.equal( intClamped(50), 0.75 )
  t.equal( intClamped(-150), 0 )

  // alt function
  t.equal( intSmooth(100), 0.034293552812071325 )
  t.equal( intSmooth(200), 0.25925925925925924 )
  t.equal( intSmooth(300), 0.5829903978052127 )
  t.equal( intSmooth(400), 0.8737997256515775 )
  t.equal( intSmooth(600), 1 )

  // output range that doesn't start at zero
  t.equal( intNonZeroOutputMin(50), 30 )
  t.equal( intNonZeroOutputMin(-50), 10 )
  t.equal( intNonZeroOutputMin(100), 40 )

  // clamp an output range that goes from a higher number to a lower number
  t.equal( intClampMaxBeforeMin(75), 0.25 )
  t.equal( intClampMaxBeforeMin(-50), 1 )
  t.equal( intClampMaxBeforeMin(150), 0 )

  t.end()
})
