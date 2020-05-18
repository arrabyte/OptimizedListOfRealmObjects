# Optimized List Of Realm Objects

This is a demo to demostrate a possible optimization using Realm database to show data inside a react native list as for example in components likes <a href="https://reactnative.dev/docs/flatlist">FlatList</a>, <a href="https://reactnative.dev/docs/sectionlist">SectionList</a>  or better a <a href="https://reactnative.dev/docs/virtualizedlist">VirtualizedList</a> that is the superclass of both.

<img src="https://www.blogpressure.tech/misc/realmlistdemo.png" width="30%" align="right" />

The goal of this demo is an implementation that can give good performance, avoiding copy of data returned by a query and to show data inside a list component with a very easy design. To have best results using Realm I tried to leverage the Realm Db lazy feature. Lazy mean that when you query results from Realm, it return an array of objects but <b>it's <u>lazy</u> because Realm read data only when strictly necessary</b> therefore the result array will be read just when you access specific elements.
This is very interesting to show a list of data because when you have many elements you can avoid to take care of pagination to have good performance. For example if in the list component inizialization you shows just 10 items, realm will fetch just these, then scrolling the list realm will fetch the others necessary objects.

Lazy feature is also a big constraint because often you need to process the resultset before feed the list component. For example when you need to group objects by data or name or other properties and feed a <a href="https://reactnative.dev/docs/sectionlist">SectionList</a> component, you need to process te whole resultset to build something that is compatible with the component, in the specific case of <a href="https://reactnative.dev/docs/sectionlist">SectionList</a> you need array of objects that represent sections and every section contain array of item. But process the whole array has an linear overhead related to the resultset size and also jeopardise the realm lazy feature.

In this Demo the dataset contains "stock market" objects. Each element has a market index and a stock name, <b>I want group data by market index</b>. An item is something like {marketIndex: 'NASDAQ', stock: 'Apple'}.

<h4>Solution</h4>

<ul>
  <li>Fetch data sorted by marketIndex;</li>
  <li>Use the resultset returned by realm query as it is. Avoid to iterate the whole resultset;</li>
  <li>Use a <a href="https://reactnative.dev/docs/virtualizedlist">VirtualizedList</a></li>
</ul>

<a href="https://reactnative.dev/docs/virtualizedlist">VirtualizedList</a> is very interesting because take in input (as for the other list component) an array of objects but you must write a method that define the Item data for the list.
In this way when can provides items with different properties, for example some items with an header. Here we have consecutive element that could have the same <u>marketIndex</u> therefore is possible insert this information inside the item and the rendering function will take care to render something like "section - item" or simply "item".

IDEA: better optimization could avoid to insert tons of items in the list component and reuse a static set of rendered items.

The demo take care also possible update of the Real dataset and for this It use realm callback and the <b>extraData</b> property of the <a href="https://reactnative.dev/docs/virtualizedlist">VirtualizedList</a> to inform the component that a rendering update is needed, as (by documentation) this is a pure component and changing the underlining dataset does not involves authomatic re-rendering.

This is a test for BLogPressure application avaiable on <a href="https://play.google.com/store/apps/details?id=com.blogpressure">Play Store</a> - Internet site <a href="https://www.blogpressure.tech/index.en.html">https://www.blogpressure.tech</a>
