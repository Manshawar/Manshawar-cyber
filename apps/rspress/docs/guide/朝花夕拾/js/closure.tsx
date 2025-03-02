import { register } from 'vue-comp';
import { useEffect } from 'react';


export default function Closure() {
  useEffect(() => {

    register()
  }, [])

  return <div>
    <div>Closure</div>
    <v-test></v-test>
  </div>;
}
