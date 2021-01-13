import sys, os, time

if len(sys.argv) != 2:
    raise Exception("Must include name for new component in command line.")

def main():
    name = sys.argv[1]
    delay = 1

    try:
        os.system("cd src/components")
    except:
        os.system("cd src && mkdir components")

    time.sleep(delay)

    if os.path.isdir("src/components/" + name ):
        raise Exception("Falied to make new component. Directory 'src/components/" + name + "' already exists.")

    try:
        os.system("cd src/components && mkdir " + name)
    except Exception as e:
        raise Exception(e)

    time.sleep(delay)

    path = "src/components/" + name

    os.system("cd " + path + " && echo import React from 'react'; > " + name + ".js && echo import styles from './" + name + ".module.css'; >> " + name + ".js && echo: >> " + name + ".js && echo export default class " + name + " extends React.Component{ render(){ return null }} >> " + name + ".js")
    time.sleep(delay)

    os.system("cd " + path + " && type NUL > " + name + ".module.css")
    time.sleep(delay)

    os.system("cd " + path + " && echo {\"main\":\"" + name + ".js\"} > package.json")
    time.sleep(delay)

    os.system("cd " + path + " && echo import React from 'react'; > " + name + ".test.js && echo import Enzyme, { shallow } from 'enzyme'; >> " + name + ".test.js && echo import Adapter from 'enzyme-adapter-react-16'; >> " + name + ".test.js && echo: >> " + name + ".test.js && echo import " + name + " from './" + name + ".js'; >> " + name + ".test.js && echo: >> " + name + ".test.js && echo Enzyme.configure({ adapter: new Adapter() }); >> " + name + ".test.js && echo: >> " + name + ".test.js && echo describe('" + name +"', function() {}) >> " + name + ".test.js")


if __name__ == "__main__":
    main()