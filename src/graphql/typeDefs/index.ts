import { userTypeDefs } from './user';
import { cardTypeDefs} from './card';
import { queryTypeDefs, cardqueryTypeDefs } from './query';
import { mutationTypeDefs } from './mutation';

export const typeDefs = [userTypeDefs, queryTypeDefs,mutationTypeDefs,cardTypeDefs, cardqueryTypeDefs];