require('dotenv').config();

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn().mockReturnValue({
        pathname: '/',
        search: '',
        hash: '',
        state: null,
        key: '5nvxpbdafa',
    }),
    useLocation: jest.fn().mockReturnValue({
        pathname: '/',
        search: '',
        hash: '',
        state: null,
        key: '5nvxpbdafa',
    }),
}));
