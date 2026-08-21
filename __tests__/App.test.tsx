import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import RequestInfo from '../src/screens/HomeScreen/OVSE/RequestInfo';

describe('App & RequestInfo Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    ReactTestRenderer.act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  test('renders App correctly', async () => {
    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(<App />);
    });
  });

  test('renders RequestInfo screen with 34 fields and 11 initial selections', async () => {
    let tree: any;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <RequestInfo navigation={{ navigate: jest.fn(), goBack: jest.fn() }} />
      );
    });

    const root = tree.root;

    // Check header title
    const headerTitle = root.findByProps({ children: 'Request info' });
    expect(headerTitle).toBeDefined();

    // Check heading
    const heading = root.findByProps({ children: 'Select information to request' });
    expect(heading).toBeDefined();

    // Check 11 of 34 fields selected pill badge
    const badgeText = root.findAllByProps({ children: '11 of 34 fields selected' });
    expect(badgeText.length).toBeGreaterThan(0);

    // Check Section counts
    const identityCount = root.findAllByProps({ children: '4 / 4' });
    expect(identityCount.length).toBeGreaterThan(0);

    const contactCount = root.findAllByProps({ children: '2 / 2' });
    expect(contactCount.length).toBeGreaterThan(0);

    const addressCount = root.findAllByProps({ children: '5 / 5' });
    expect(addressCount.length).toBeGreaterThan(0);

    const othersCount = root.findAllByProps({ children: '0 / 23' });
    expect(othersCount.length).toBeGreaterThan(0);
  });

  test('toggling a field updates selected count dynamically', async () => {
    let tree: any;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <RequestInfo navigation={{ navigate: jest.fn(), goBack: jest.fn() }} />
      );
    });

    const root = tree.root;

    // Find the touchable row containing Full Name
    const fullNameLabel = root.findByProps({ children: 'Full Name' });
    let touchable = fullNameLabel.parent;
    while (touchable && (!touchable.props || typeof touchable.props.onPress !== 'function')) {
      touchable = touchable.parent;
    }
    expect(touchable).toBeDefined();

    await ReactTestRenderer.act(() => {
      touchable.props.onPress();
    });

    // Count should now be 10 of 34
    const updatedBadge = root.findAllByProps({ children: '10 of 34 fields selected' });
    expect(updatedBadge.length).toBeGreaterThan(0);

    // Identity should now be 3 / 4
    const updatedIdentity = root.findAllByProps({ children: '3 / 4' });
    expect(updatedIdentity.length).toBeGreaterThan(0);

    // Toggle it back to selected
    await ReactTestRenderer.act(() => {
      touchable.props.onPress();
    });

    // Count should return to 11 of 34
    const restoredBadge = root.findAllByProps({ children: '11 of 34 fields selected' });
    expect(restoredBadge.length).toBeGreaterThan(0);
  });

  test('search filter filters displayed fields properly', async () => {
    let tree: any;
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <RequestInfo navigation={{ navigate: jest.fn(), goBack: jest.fn() }} />
      );
    });

    const root = tree.root;

    // Find search TextInput
    const textInput = root.findByProps({ placeholder: 'Filter — district, mobile, DOB...' });
    expect(textInput).toBeDefined();

    // Type 'pincode' into search input
    await ReactTestRenderer.act(() => {
      textInput.props.onChangeText('pincode');
    });

    // Pincode should be found
    const pincodeLabel = root.findAllByProps({ children: 'Pincode' });
    expect(pincodeLabel.length).toBeGreaterThan(0);

    // Full Name should not be visible when searching pincode
    const fullNameLabel = root.findAllByProps({ children: 'Full Name' });
    expect(fullNameLabel.length).toBe(0);

    // Clear search
    await ReactTestRenderer.act(() => {
      textInput.props.onChangeText('');
    });

    // Full Name should be visible again
    const restoredFullName = root.findAllByProps({ children: 'Full Name' });
    expect(restoredFullName.length).toBeGreaterThan(0);
  });
});



