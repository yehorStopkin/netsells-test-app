import { storiesOf } from '@storybook/vue';
import TheTutorial from '../components/TheTutorial.vue';

storiesOf('Tutorial', module)
    .add('without text', () => ({
        components: { TheTutorial },
        template: '<TheTutorial></TheTutorial>',
    }))
    .add('with text', () => ({
        components: { TheTutorial },
        template: '<TheTutorial message="Some message"></TheTutorial>',
    }));
