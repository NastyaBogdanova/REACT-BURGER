import React from 'react';

//будет дорабатываться

const withToggleModal = (WrappedComponent) => props => {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = { isModalOpen: false };
            this.toggleModalOpen = this.toggleModalOpen.bind(this);
        }

        toggleModalOpen = () => this.setState({ isModalOpen: !this.state.isModalOpen });

        render() {
            //const { toggleModalOpen, isModalOpen } = this.props;
            return (
                <WrappedComponent {...props}
                    onClick={this.toggleModalOpen}
                    isModalOpen={this.state.isModalOpen}
                />
            )
        }
    }
};

export default withToggleModal;