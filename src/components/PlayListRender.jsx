/* import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations'; */
import * as React from 'react';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.type = 'Push';
        this.leftToggle = this.leftToggle.bind(this);
        this.rightToggle = this.rightToggle.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }
    onCreate() {
        this.leftSidebarObj.element.style.visibility = '';
        this.rightSidebarObj.element.style.visibility = '';
    }
    // Toggle(Open/Close) the Sidebar1
    leftToggle() {
        this.leftSidebarObj.toggle();
    }
    // Toggle(Open/Close) the Sidebar2
    rightToggle() {
        this.rightSidebarObj.toggle();
    }
    render() {
        return (<div className="control-section">
                <div id="wrapper">
                    
                    <SidebarComponent id="default" ref={Sidebar => this.leftSidebarObj = Sidebar} width="200px" type={this.type} created={this.onCreate} style={{ visibility: "hidden" }}>
                        <div className="title"> Left Sidebar content</div>
                    </SidebarComponent>
                    
                    <SidebarComponent id="default1" ref={Sidebar => this.rightSidebarObj = Sidebar} width="200px" type={this.type} position="Right" created={this.onCreate} style={{ visibility: "hidden" }}>
                        <div className="title"> Right Sidebar content</div>
                    </SidebarComponent>
                    <div className="e-main-content">
                        <p>Place your main content here.....</p>
                        <ButtonComponent onClick={this.leftToggle} id="toggle-btn" className="e-btn e-info">Toggle Sidebar1</ButtonComponent>
                        <br /><br />
                        <ButtonComponent onClick={this.rightToggle} id="toggle-btn1" className="e-btn e-info">Toggle Sidebar2</ButtonComponent>
                    </div>
               </div>
            </div>);
    }
}