import Container from "../src/Container"
import Pipeline from "../src/Support/Pipeline"
import {PipeState, PipeA, PipeB, PipeC} from "./Mocks"

test('Can Pipe object state through classes via a specified method.', () => {

    const container = new Container
    const result = new Pipeline(container)
        .send(PipeState)
        .through([PipeA, PipeB, PipeC])
        .via('handle')
        .then((obj) => {
            obj.state = (obj.state * 2)
            return obj
        })
    expect(result.state).toBe(10)
})
