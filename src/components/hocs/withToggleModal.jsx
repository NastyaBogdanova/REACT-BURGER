import React from 'react';

const withToggleModal = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = { isModalOpen: false };
            this.toggleModalOpen = this.toggleModalOpen.bind(this);
        }

        toggleModalOpen = () => this.setState({ isModalOpen: !this.state.isModalOpen });

        render() {
            return (
                <WrappedComponent {...this.props}
                    onClick={this.toggleModalOpen}
                    isModalOpen={this.state.isModalOpen}
                />
            )
        }
    }
};

export default withToggleModal;