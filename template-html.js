module.exports = {
"outer": `
<table>
  <tr>
    <td>
      {{this}}
    </td>
    <td>
      {{this}}
    </td>
  </tr>
  <tr>
    <td>
      {{this}}
    </td>
    <td>
      {{this}}
    </td>
  </tr>
</table>
`,
"inner": `
<table>
  <tr>
    <td>
      <ol>
        {{#each m.[0]}}
        <li>{{this}}</li>
        {{/each}}
      </ol>
    </td>
    <td>
      <ol start="7">
        {{#each m.[1]}}
        <li>{{this}}</li>
        {{/each}}
      </ol>
    </td>
  </tr>
  <tr>
    <td>
      <ol start="13">
        {{#each m.[2]}}
        <li>{{this}}</li>
        {{/each}}
      </ol>
    </td>
    <td>
      <ol start="19">
        {{#each m.[3]}}
        <li>{{this}}</li>
        {{/each}}
      </ol>
    </td>
  </tr>
  <tr>
   <td colspan="2" style="text-align: center">
     {{checksum.test}}
     {{checksum.real}}
   </td>
  </tr>
</table>
`};
